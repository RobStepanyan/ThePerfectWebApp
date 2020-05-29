import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import Moment from 'moment';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [<EmptyResults text="Will appear here" />],
            emptyResult: true,
            last_updated: null,
            getUpdateButtonText: 'Get Data!',
            getUpdateButtonFirstInput: true,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    printResponse(response) {
        this.setState({ getUpdateButtonText: 'Update Data!', getUpdateButtonFirstInput: false, results: [], emptyResult: false });
        // Sorting API response by date
        response['data'] = response['data'].sort((a, b) => (new Date(a['created_at']) > new Date(b['created_at'])) ? 1 : -1);
        response['data'].forEach(e => {
            let full_name = e['full_name'].split('/')
            this.setState({
                results: this.state.results.concat(
                    <ResultRepo name={full_name[1]} url={e['html_url']} description={e['description']} createdAt={e['created_at']} />),
                last_updated: e['last_updated']
            })
        });
    }

    handleClick() {
        let username = $('#username').val()
        if (username.trim().length === 0) {
            $('#username').addClass('border-danger')
            $('.input-error').text('Username shouldn\'t be empty')
            $('.input-error').removeClass('opacity-0')
        } else {
            $('#username').removeClass('border-danger')
            $('.input-error').addClass('opacity-0')
            $('.input-error').text('Error here')
        }
        let url = `http://localhost:8000/repos/${username}`
        if ($('.get-update-btn').text() === 'Update Data!') {
            url += '?updateData=true'
        }
        axios.get(url)
        .then(response => {this.printResponse(response)})
        .catch(() => {
            this.setState({ results: [<EmptyResults text="Wrong username" />], emptyResult: true })
        })
    }

    handleInput() {
        this.setState({ getUpdateButtonText: 'Get Data!' })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mx-auto my-5">
                        <LightDarkButton />
                        <div className="title-card shadow">
                            <div className="title">Get Information About Github Repositories</div>
                            <div className="sub-title">Simply type a username</div>
                            <div className="row justify-content-center align-items-center mt-4">
                                <div className="col-12 col-lg-6 mb-2">
                                    <p className="input-error opacity-0">Error here</p>
                                    <input onInput={this.handleInput} className="w-100" type="text" maxLength="200" placeholder="here" id="username"></input>
                                </div>
                                <div className="col-12 col-lg-2 mb-2">
                                    <GetUpdateButton onClick={this.handleClick} name={this.state.getUpdateButtonText}></GetUpdateButton>
                                </div>
                            </div>
                        </div>
                        <div className="result-card shadow mt-3">
                            <div className="row justify-content-center">
                                <div className="title">Your Results</div>
                            </div>
                            {this.state.last_updated &&
                                <div className="row justify-content-center">
                                    <div>Last Updated: {Moment(this.state.last_updated).fromNow()}</div>
                                </div>}
                            <hr />
                            <div className="row justify-content-center">
                                <div className="col-lg-10" id="result">
                                    {!this.state.emptyResult &&
                                        <ul className="timeline">
                                            {this.state.results}
                                        </ul>
                                    }
                                    {this.state.emptyResult &&
                                        <div>
                                            {this.state.results}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function ResultRepo(props) {
    return (
        <li className="event" data-date={Moment(props.createdAt).format('MMMM YYYY')}>
            <h3><a href={props.url}>{props.name}</a></h3>
            <p>{props.description}</p>
        </li>
    )
}

function EmptyResults(props) {
    return (
        <h3 className="text-center font-weight-bold text-black-50">{props.text}</h3>
    )
}

function GetUpdateButton(props) {
    return (
        <button onClick={props.onClick} className="btn btn-lg btn-primary get-update-btn">{props.name}</button>
    )
}

class LightDarkButton extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isClicked: (localStorage.getItem('data-theme')==='dark') ? true : false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        if (this.state['isClicked']) {
            this.setState({isClicked: false})
            $('body').attr('data-theme', 'light')
            localStorage.setItem('data-theme', 'light')
        } else {
            this.setState({isClicked: true})
            $('body').attr('data-theme', 'dark')
            localStorage.setItem('data-theme', 'dark')
        }
    }

    componentDidMount() {
        if (this.state.isClicked && !$('.switch-wrap input').attr('checked')) {
            $('.switch-wrap input').attr('checked', 'checked')
            $('body').attr('data-theme', 'dark')
        }
    }

    render(){
    return (
        <div className="row justify-content-center align-items-center pb-2">
            <h5 className="text-color-rev m-0 mr-2">Dark Theme</h5>
            <label className="switch-wrap m-0">
                <input onClick={this.handleClick} type="checkbox" />
                <div className="switch"></div>
            </label>
        </div>
    )}
}
ReactDom.render(<MainContainer />, document.getElementById('root'))

