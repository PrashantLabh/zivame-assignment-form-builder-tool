import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

const FormsList = props => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/forms`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                }
        }).then(res => res.json())
        .then((res) => {
            console.log(res);
            setForms(res);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    function renderTableData() {
        return forms.map((form, index) => {
           const { _id, formConfig, date } = form;
           return (
              <tr key={_id}>
                 <td>{_id}</td>
                 <td>{new Date(date).toDateString()}</td>
                 <td><Link to={location => `/form/${_id}`}>Edit</Link></td>
                 <td>{}</td>
              </tr>
           )
        })
     }

    return (
        <div>
            <h2 className="forms-title">FORMS LIST</h2>
            <div className="create-new"><Link to={location => `/form/new`}>Create New</Link></div>
            <table id='forms'>
               <tbody>
                  {renderTableData()}
               </tbody>
            </table>
        </div>
    );
};

export default FormsList;