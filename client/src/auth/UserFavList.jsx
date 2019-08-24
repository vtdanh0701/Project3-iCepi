import React from 'react';
import axios from 'axios'
import { RSA_NO_PADDING } from 'constants';
import {Link} from 'react-router-dom';
import './FavList.css'

class UserFavList extends React.Component{
constructor(props){
    super(props);
    this.state = {
        favLists: '',
        favItem: [],
        hello: "Hello",
    }
    this.getFavList = this.getFavList.bind(this)
    this.deleteList = this.deleteList.bind(this)
}
getFavList(){
    var url = `/api/user/${this.props.userId}/favList`
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get(url).then(res=>{
        this.setState({
            favLists: res.data,
            
        })
    })
}

deleteList(e){
    var url = `/api/user/${this.props.userId}/favList/${e.target.value}`
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.delete(url).then(res=>{
        this.getFavList();
    })
}

componentDidMount(){
    this.getFavList()
}
    
render(){
    var favLists = this.state.favLists
    var favItem = []
    if(favItem.length === 0){
        favItem = "You don't have any recipe yet"
    }else{
        for(var i = 0; i< favLists.length; i++){
            var  url = `/recipes/${favLists[i].recipeId}/details`
            favItem.push(
                <div className='fave-container'>
                    <Link to={url}>
                        <div className='fave-node'>
                            <div className='title'>{favLists[i].title}</div>
                            <img src= {favLists[i].imgUrl} alt="Recipe Photo"/>     
                        </div>
                    </Link>
                    
                    <button onClick={this.deleteList} value={favLists[i]._id}>Delete</button>
                </div>
            )
        }
    }
    
    return(
        <div className='faveList'>
        
         {favItem}
        </div>
    )
}
    
}

export default UserFavList;