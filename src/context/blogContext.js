import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/blogReducer";
import { auth,provider,db } from "../firebaseConf";
import {signInWithPopup, signOut} from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

export const BlogContext = createContext();

const initialState = {
    isAuth:JSON.parse(localStorage.getItem("isAuth"))||false,
    allPosts:[],
    userData:null,
    userPosts:[],
    userName:"",
    img:"",
    filters:{
        text:"",
        category:"all"
    },
    filteredPosts: [],
    mode: localStorage.getItem('mode') || 'light'
}

export const BlogContextPorvider = ({children}) => {

    const [state,dispatch] = useReducer(reducer,initialState);
    const signInWithGoogle = () => {
        signInWithPopup(auth,provider).then((result) => {
            localStorage.setItem("isAuth",true);
        })
        dispatch({type:"SET_LOGIN"});
    }
    const signOutFromGoogle = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            dispatch({type:"SIGN_OUT"})
            window.location.pathname = './login'
        })
    }
    const deletePost = async (id) => {
        try{
            const postDocRef = doc(db,"blogPosts",id);
            await deleteDoc(postDocRef);
            dispatch({type:"DELETE_POST",payload:id});
        }
        catch(error){
            console.error('Error deleting post:', error);
        }
    }
    const postCollectionRef = collection(db, "blogPosts");
    const fetchPosts = async () => {
        try {
            const querySnapshot = await getDocs(postCollectionRef);
            const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(posts)
            dispatch({type:"GET_ALL_POSTS",payload:posts});
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
    }
    const getUserPosts = (userName,photoURL) => {
        dispatch({type:"GET_USER_DATA",payload:{userName,photoURL}});
    }
    const updateFilterValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        return dispatch({type:"UPDATE_FILTER_VALUE",payload:{name,value}})
    }
    const changeMode = () => {
        const newMode = state.mode === 'light' ? 'dark' : 'light';
        localStorage.setItem('mode',newMode)
        dispatch({type:"CHANGE_MODE"});
    }
    
    useEffect(() => {
        fetchPosts();
    },[])
    useEffect(() => {
        dispatch({type:"FILTER_PRODUCTS"})
    },[state.filters])
    

    return <BlogContext.Provider value={{...state,signInWithGoogle,signOutFromGoogle,deletePost,getUserPosts,updateFilterValue,changeMode}}>{children}</BlogContext.Provider>
}
export const useBlogContext = () => {
    return useContext(BlogContext);
}