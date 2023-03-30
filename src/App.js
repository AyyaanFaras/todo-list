// import React, {useState} from 'react'
// import './App.css'
// import TodoInput from './components/TodoInput'
// import TodoList from './components/TodoList'
// function App() {
//    const [listTodo,setListTodo]=useState([]);
//    let addList = (inputText) => {
//       if (inputText !== '')
//          setListTodo([...listTodo, inputText]);
//    }
//    const deleteListItem = (key) => {
//       let newListTodo = [...listTodo];
//       newListTodo.splice(key, 1)
//       setListTodo([...newListTodo])
//    }
//    return (
//       <div className="main-container">
//          <div className="bg">
//             <div className="center-container">
//             <TodoInput addList={addList} />
//             <h1 className="app-heading">TODO</h1>
//             <hr />
//             {listTodo.map((listItem, i) => {
//                return (
//                   <TodoList key={i} index={i} item={listItem} deleteItem={deleteListItem} />
//                )
//             })}
//             </div>
//          </div>
//      </div>
//   )
// }

// export default App








































import "./App.css";
import React from "react";
import ListItems from "./ListItems";
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: "",
      },
    };
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);

  }

  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  }
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
    if(newItem.text!==""){

      const newItems=[...this.state.items, newItem];
      this.setState({
        items:newItems,
        currentItem:{
          text:'',
          key:''
        }
      })
    }
  }
  deleteItem(key){
    const filteredItems = this.state.items.filter(item => 
      item.key!==key);
      this.setState({
        items:filteredItems,
      })
  }
  setUpdate(text, key){
    const items =this.state.items;
    items.map(item => {
      if(item.key===key){
        item.text=text;
      }
    })
    this.setState({
      item:items
    })
  }
  render() {
    return (
      <div className="App">
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
            <input
              type="text"
              placeholder="Enter Text"
              value={this.state.currentItem.text}
              onChange={this.handleInput}
            />
            <button type="submit">Add</button>
          </form>
        </header>

        <ListItems items = {this.state.items}
        deleteItem={this.deleteItem}
        setUpdate={this.setUpdate}>
        </ListItems>
      </div>
    );
  }
}
export default App;
