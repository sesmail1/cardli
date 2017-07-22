import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

var SET = [
    {
        title: "React",
        content: "A Javascript library for creating UI's.",
        id: 1
    },
    {
        title: "Redux",
        content: "Used with React to manage state.",
        id: 2,
    },
    {
        title: "Bootstrap",
        content: "A front-end CSS framework for building quick website components.",
        id: 3,
    }
];

var nextId = 4;

var Navigation = createReactClass({
    render: function() {
        return (
<nav className="card navbar navbar-toggleable-md navbar-light bg-faded">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <a className="navbar-brand" href="#">Cardli</a>

    <form className="form-inline mr-auto mt-2 mt-lg-0">
      <input className="form-control mr-sm-2" type="text" placeholder="Create New Set"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">+</button>
    </form>
    <ul className="navbar-nav">
      <li className="nav-item active mr-sm-2">
        <button className="navbar-text btn btn-outline-info arrow-set">My Sets ↓</button>
      </li>
      <li className="nav-item active">
        <a className="navbar-text mr-sm-2">Sameer Dewan</a>
      </li>
    </ul>
  </div>
</nav>
        );
    },
});

var Notecard = createReactClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired,
        onRemove: React.PropTypes.func.isRequired,
    },
    getInitialState: function() {
        return {
            editMode: false,
            title: (this.props.title),
            content: (this.props.content),
        }
    },
    onEdit: function() {
       if(!this.state.editMode) {
           this.setState({
               editMode: true,
           });
           console.log(this.state.editMode);
       } else {
           this.setState({
               editMode: false,
           });
           console.log(this.state.editMode);
       }
    },
    onTitleChange: function(e) {
        // console.log('onTitleChange', e.target.value);
        this.setState({
            title: e.target.value
        })
    },
    onContentChange: function(e) {
        // console.log('onTitleChange', e.target.value);
        this.setState({
            content: e.target.value
        })
    },
    render: function() {
        if(!this.state.editMode) {
            return (
                <div className="col-md-3">
                    {/*CARDLI CARD*/}
                    <div className="card notecard-style">
                    <div className="card-block">
                        <h3 className="card-title">{this.state.title}</h3>
                        <p className="card-text">{this.state.content}</p>
                        <button type="button" onClick={this.onEdit} className="btn btn-info mr-sm-1">Edit</button>
                        <button type="button" onClick={this.props.onRemove} className="btn btn-danger">X</button>
                    </div>
                    </div>
                {/*END CARDLI CARD*/}
                </div>
            );
        }
        if(this.state.editMode) {
            return (
                <div className="col-md-3">
                    {/*CARDLI CARD*/}
                    <div className="card notecard-style">
                        <div className="card-block">
                            <div className="form-group">
                                <input type="text" value={this.state.title} onChange={this.onTitleChange}/>
                                <br />
                                <br />
                                <textarea className="form-control" value={this.state.content} onChange={this.onContentChange} id="exampleTextarea" rows="3"></textarea>
                            </div>
                            <button type="button" onClick={this.onEdit} className="btn btn-danger">Save</button>
                        </div>
                    </div>
                {/*END CARDLI CARD*/}
                </div>
            );
        }
    },
});

var AddNoteCardForm = createReactClass({
    propTypes: {
        onAdd: React.PropTypes.func.isRequired,
    },
    getInitialState: function() {
        return {
            title: "Notecard Title",
            content: "Notecard Content"
        }
    },
    onTitleChange: function(e) {
        // console.log('onTitleChange', e.target.value);
        this.setState({
            title: e.target.value
        })
    },
    onContentChange: function(e) {
        // console.log('onTitleChange', e.target.value);
        this.setState({
            content: e.target.value
        })
    },
    onSubmit: function() {   
        this.props.onAdd(this.state.title,this.state.content);
        this.setState({
            title: "Notecard Title",
            content: "Notecard Content"
        });
    },
    render: function() {
        return (
            <div className="col-md-3">
                <div className="card style-add">
                    <div className="card-block ">
                        <h4 className="btn btn-outline-info">Current Set</h4>
            
                        <div className="form-group">
                            <input type="text" value={this.state.title} onChange={this.onTitleChange}/>
                            <br /> <br />
                            <textarea className="form-control" value={this.state.content} onChange={this.onContentChange} id="exampleTextarea" rows="3"></textarea>
                            < br/>
                            <button type="button" onClick={this.onSubmit} className="btn btn-success">Add +</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },    
    
        
});


var Cardli = createReactClass({
    propTypes: {
        initialSet: React.PropTypes.arrayOf(React.PropTypes.shape({
            title: React.PropTypes.string.isRequired,
            content: React.PropTypes.string.isRequired,
            id: React.PropTypes.number.isRequired,
        })).isRequired,
    },
    getInitialState: function() {
        return {
            set: this.props.initialSet,
            editMode: false,
        };
    },
    onNotecardAdd: function(title, content) {
        console.log('Title added:', title, ' Content added:', content );
        this.state.set.push({
            title: title,
            content: content,
            id: nextId,
        });
        this.setState(this.state);
        nextId += 1;
    },
    onRemoveCard: function(index) {
        //  console.log('removed:', index);
        this.state.set.splice(index, 1);
        this.setState(this.state);
    },
    render: function() {
        return (
            <div className="cardli container-fluid">
                <Navigation />
                <div className="notecard-container row"> 

                    {/*CARDLI FORM*/}
                    <AddNoteCardForm onAdd={this.onNotecardAdd} />
                    {/*END CARDLI FORM*/}

                    {/*CARDLI CARDS IN SET*/}
                    {this.props.initialSet.map(function(notecard, index){
                        return (
                            <Notecard 
                                onRemove={function() {this.onRemoveCard(index)}.bind(this)}
                                title={notecard.title} 
                                content={notecard.content} 
                                key={notecard.id} />
                        );
                    }.bind(this))}
                    {/*END CARDLI CARDS IN SET*/}
        


                
                {/*End NoteCard Container and Bootstrap Row*/}
                </div> 
            {/*End Cardli Application Div*/}    
            </div> 

        );
    },
});

var root = document.getElementById('root');
ReactDOM.render(<Cardli initialSet={SET} />, root);