import React, { useState, useEffect } from 'react';
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";
import Generator from "zivame-assignment-universal-form-renderer/src/formGenerator";
import validator from "../../../helper/validator";
import { useParams, useHistory, Link } from 'react-router-dom';


const FormEditor = props => {

    const [saveBtn, setSaveBtn] = useState(false);

    const [files, setFiles] = useState([]);

    const params = useParams();

    const history = useHistory();

    useEffect(() => {
        //mount web component app
        document.getElementById("app").style.display = "inherit";
        if (params && params.id !== "new") {
            fetch(`http://localhost:3001/api/form/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then((res) => {
                    console.log(res);
                    setFiles(res.formConfig);
                    updateFormRenderer(res.formConfig);
                }).catch(err => {
                    console.log(err);
                })
        } else {
            updateFormRenderer([]);
        }
        return () => {
            // unmount web component app
            document.getElementById("app").style.display = "none";
        }
    }, []);

    function updateFormRenderer(jsObject) {
        const genContainer = document.getElementById("generator");
        const formValuesContainer = document.querySelector("#formValues #vContainer");
        const renderFromValuesContainer = () => {
            formValuesContainer.innerText = JSON.stringify(formValues, null, 4);
        };
        const formValues = {
        };
        renderFromValuesContainer();
        let generateForm = new Generator(
            jsObject,
            genContainer,
            formValues,
            renderFromValuesContainer,
            params.id
        );
    }

    function onChange(val) {
        console.log(val)

        // validate the form config
        if (!val.jsObject) return;
        if (!validator(val.jsObject)) return;

        //set the input config in state
        setFiles(val.jsObject);

        //Enable Save Btn
        setSaveBtn(true)

        //update the renderer if valid
        updateFormRenderer(val.jsObject)

    }

    function handleFileUpload(e) {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log("e.target.result", e.target.result);
            // validates the Json
            setFiles(JSON.parse(e.target.result));
            setSaveBtn(true)
            updateFormRenderer(JSON.parse(e.target.result));
        };
    }

    function onSave() {
        if (!validator(files)) return;
        const url = params && params.id !== "new" ? `http://localhost:3001/api/form/${params.id}` : 'http://localhost:3001/api/form';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(files)
        })
            .then(resp => resp.json())
            .then((resp) => {
                console.log(resp);
                if(resp.success) alert("Successfully Saved");
                if (resp._id != params.id) history.push(`/form/${resp._id}`);
            }).catch(err => {
                console.log(err);
            })

    }


    return (
        <div>
            <p>FORM EDITOR</p>
            <div className="buttons-container" >
                <input type="file" className="config-upload" placeholder="Upload JSON Config"
                    accept=".json" onChange={handleFileUpload} />
                <div className="list-btn"><Link to={location => `/forms`}>List of Existing Forms</Link></div>
            </div>
            <JSONInput
                id="a_unique_id"
                locale={locale}
                colors={{
                    string: "#DAA520"
                }}
                placeholder={files}
                height='600px'
                width='1000px'
                onChange={onChange}
            />
            <div className="buttons-container" >
                {saveBtn ? <input type="button" value="Save Config" className="save" onClick={onSave} /> : null}
            </div>
        </div>
    );
};

export default FormEditor;