import React from 'react';
import axios from 'axios'
import { RSA_NO_PADDING } from 'constants';
import {Link} from 'react-router-dom'

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
    var url = `/api/user/${this.props.match.params.id}/favList`
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get(url).then(res=>{
        this.setState({
            favLists: res.data,
            hello: 'Bonjour'
        })
    }).then(res => {
      console.log('hello' + this.state.favLists)    
    })
}

deleteList(e){
    var url = `/api/user/${this.props.match.params.id}/favList/${e.target.value}`
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.delete(url).then(res=>{
        this.setState({
            favLists: res.data
        })
    })
}

componentDidMount(){
    this.getFavList()
}
    
render(){
    var favLists = this.state.favLists
    var favItem = []
    for(var i = 0; i< favLists.length; i++){
        var  url = `/recipes/${favLists[i].recipeId}/details`
        favItem.push(
            <div>
                <Link to={url}>
                    <div>
                        <div>{favLists[i].title}</div>
                        <img src= {favLists[i].imgUrl} alt="Recipe Photo"/>     
                    </div>
                </Link>
                <div>{favLists[i].recipeId}</div>
            <button onClick={this.deleteList} value={favLists[i]._id}>Delete</button>
            </div>
        )
    }
    return(
        <>
        <h1>Hello from fav list</h1>
       
        <h1>{this.props.match.params.id}</h1>
        <h1>{this.state.hello} </h1>
        {favItem}
        </>
    )
}
    
}

export default UserFavList;