import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    componentDidMount() {
        this.fetchTask();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    addTask(e) {
        if (this.state._id) {
            // update
            fetch(`api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({
                        html: data.status
                    });

                    this.setState({
                        title: '',
                        description: ''
                    });

                    this.fetchTask();
                });
        } else {
            //create
            fetch('api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({
                        html: data.status
                    });

                    this.setState({
                        title: '',
                        description: ''
                    });

                    this.fetchTask();
                })
                .catch(err => console.error(err));
        }

        e.preventDefault();
    }

    fetchTask() {
        fetch('api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    tasks: data
                });
            });
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete it?')) {
            fetch(`api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({
                        html: data.status
                    });
                    this.fetchTask();
                })
        }
    }

    editTask(id) {
        fetch(`api/tasks/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                });
            })
    }

    render() {
        return (
            <div>
                {/* Navigation */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="inpur-field col s-12">
                                                <input value={this.state.title} name="title" onChange={this.handleChange} type="text" placeholder="Task title" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="inpur-field col s-12">
                                                <textarea value={this.state.description} name="description" onChange={this.handleChange} placeholder="Task description" className="materialize-textarea"></textarea>
                                            </div>
                                        </div>
                                        <button className="btn light-blue darken-4" type="submit">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.editTask(task._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" onClick={() => this.deleteTask(task._id)} style={{ margin: '4px' }}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default App;