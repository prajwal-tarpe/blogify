function blogReducer(state, action) {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isLoggedIn: false,
        userPosts: [],
      };
    case "GET_ALL_POSTS":
      return {
        ...state,
        allPosts: action.payload,
        filteredPosts: action.payload // Initialize filteredPosts with allPosts
      };
    case "DELETE_POST":
      return {
        ...state,
        allPosts: state.allPosts.filter(post => post.id !== action.payload),
        filteredPosts: state.filteredPosts.filter(post => post.id !== action.payload)
      };
    case "GET_USER_DATA":
      return {
        ...state,
        userPosts: state.allPosts.filter(post => post.author.name === action.payload.userName),
        userName: action.payload.userName,
        img: action.payload.photoURL
      };
    case "UPDATE_FILTER_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value
        }
      };
    case "FILTER_PRODUCTS":
      let { allPosts } = state;
      let tempFilterData = [...allPosts];
      const { text, category } = state.filters;
      if (text) {
        tempFilterData = tempFilterData.filter((curElem) => {
          return curElem.title.toLowerCase().includes(text.toLowerCase()) ||
                curElem.postText.toLowerCase().includes(text.toLowerCase())
        });
      }
      if (category !== 'all') {
        tempFilterData = tempFilterData.filter((curElem) => {
          return curElem.category === category;
        });
      }
      return {
        ...state,
        filteredPosts: tempFilterData,
      };
    case "CHANGE_MODE":
      let givenMode = state.mode;
      
      return{
        ...state,
        mode: givenMode==='light'?'dark':'light'

      }
    default:
      return state;
  }
}

export default blogReducer;
