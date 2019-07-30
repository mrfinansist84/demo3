import React, {
    Component
} from 'react';
import './scss/AdminInnerPage.scss'

export default class AdminInnerPage extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    handlerAddQuestion(e) {
        const collection = document.querySelectorAll('.cAdminInnerPageFormInput');

        e.preventDefault();
        this.props.addQuestionToServer(collection);
        document.querySelector('.cAdminInnerPageForm').reset();
    }

    render() {
        const optionList = ['health', 'finance', 'career', 'leisure', 'relatives'],
            inputList = [
            { labelText: 'Text', inputType: 'text' }, 
            { labelText: 'Answer1', inputType: 'text' },
            { labelText: 'Value Answer1', inputType: 'number' },
            { labelText: 'Answer2', inputType: 'text' },
            { labelText: 'Value Answer2', inputType: 'number' },
            { labelText: 'Answer3', inputType: 'text' },
            { labelText: 'Value Answer3', inputType: 'number' },
            { labelText: 'Answer4', inputType: 'text' },
            { labelText: 'Value Answer4', inputType: 'number' },
        ]

        return (
            <div className="container">
                <div className="admin-panel">
                <h1 className="title">Admin Panel</h1>
                <ul className="controls">
                    <li className="dropdown">
                        <input type="radio" name="adminMenu" value="Add question"/>
                        <a href="#" data-toggle="dropdown">Add question</a>
                        <ul className="dropdown-menu dropdown-menu--users">
                            <li><form className="cAdminInnerPageForm" onSubmit={this.handlerAddQuestion.bind(this)}>
                                <label className="cAdminInnerPageFormLabel">Type<select className="cAdminInnerPageFormInput cAdminInnerPageFormInput--Type">
                                    {optionList.map((option, i) => {
                                        return <option value={option} key={i}>{option}</option>
                                    })}
                                </select></label>

                                {inputList.map((input, i) => {
                                        return <label key={i}><input type={input.inputType} placeholder={input.labelText} className="cAdminInnerPageFormInput" /></label>
                                    })}

                                <button type="submit" className="cAdminInnerPageFormBtn">ADD</button>
                            </form></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <input type="radio" name="adminMenu" onClick={this.props.getUsersList.bind(this)} />
                        <a href="#" data-toggle="dropdown">Kick lazy member</a>
                        <ul className="dropdown-menu dropdown-menu--users"
                            onClick={this.props.handlerKick.bind(this, this.props.getUsersList.bind(this), this.props.self)}>

                            {this.state.data.map((user, i) => {
                                return (
                                    <li key={i} className="userFields">
                                        <p>{user}</p><span className="kickBtn" data-id={i}>x</span>
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </li>
                </ul>
                </div>
            </div >
        )
    }
}