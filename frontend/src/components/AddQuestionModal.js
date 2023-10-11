import { useState, useEffect } from 'react';
import styles from '../styles/components/AddQuestionModal.module.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { addQuestion } from '../api/questions';

const AddQuestionModal = ({ isVisible, setIsVisible }) => {
    const containerStyle = isVisible ? "container-visible" : "container-not-visible";

    const [description, setDescription] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [complexity, setComplexity] = useState("Easy");
    const [errorMessage, setErrorMessage] = useState("");
    const [testCaseInputs, setTestCaseInputs] = useState("");
    const [expectedOutputs, setExpectedOutputs] = useState("");
    const [codeTemplate, setCodeTemplate] = useState("");

    const onDescriptionChange = (description) => {
        setDescription(description);
    };

    const onTitleChange = e => {
        setTitle(e.target.value);
    };

    const onCategoryChange = e => {
        setCategory(e.target.value);
    };

    const onComplexityChange = e => {
        setComplexity(e.target.value);
    };

    const onTestCaseChange = e => {
        setTestCaseInputs(e.target.value);
    };

    const onExpectedOutputChange = e => {
        setExpectedOutputs(e.target.value);
    };

    const onCodeTemplateChange = e => {
        setCodeTemplate(e.target.value);
    }

    const submitHandler = async e => {
        e.preventDefault();
        const stringifiedDescription = draftToHtml(convertToRaw(description.getCurrentContent()));
        
        if (stringifiedDescription.trim() === "<p></p>" || title.trim().length === 0 || category.trim().length === 0) {
            setErrorMessage("Submit failed. All fields must be filled");
            return;
        }

        let testCaseInputsArr;
        try {
            testCaseInputsArr = JSON.parse(testCaseInputs);
        } catch (error) {
            setErrorMessage("Submit failed. Test case inputs should be an array of objects");
            return;
        }

        let expectedOutputsArr;
        try {
            expectedOutputsArr = JSON.parse(expectedOutputs);
        } catch (error) {
            setErrorMessage("Submit failed. Outputs should have an array format");
            return;
        }

        const response = await addQuestion(
            title, 
            category, 
            complexity, 
            stringifiedDescription, 
            testCaseInputsArr, 
            expectedOutputsArr,
            codeTemplate
        );

        if (response.status !== 201) {
            setErrorMessage(response.message);
            return;
        }
        
        setIsVisible(false);
        setErrorMessage("");
        setTitle("");
        setDescription(EditorState.createEmpty());
        setCategory("");
        setComplexity("Easy")
        setTestCaseInputs("");
        setExpectedOutputs("");
        setCodeTemplate("");
    };

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        }
    }, [isVisible]);
    
    return (
        <div className={styles[containerStyle]} onClick={() => setIsVisible(false)}>
            <div className={styles["form-container"]} onClick={e => e.stopPropagation()}>
                <h2>Add Question</h2>
                <form className={styles["form"]}>
                    <div className={styles["input-container"]}>
                        <label htmlFor="title">Title:</label>
                        <input 
                            type="text" 
                            placeholder="New Title" 
                            name="title" 
                            id="title" 
                            value={title}
                            onChange={onTitleChange} 
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="category">Category:</label>
                        <input 
                            type="text" 
                            placeholder="Category (e.g. Binary Search)" 
                            name="category" 
                            id="category"
                            value={category} 
                            onChange={onCategoryChange} 
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="complexity">Complexity:</label>
                        <select 
                            name="complexity" 
                            id="complexity" 
                            className={styles["complexity-container"]}
                            value={complexity}
                            onChange={onComplexityChange}
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <div className={styles["description-container"]} >
                        <label>Description:</label>
                        <Editor
                            editorState={description}
                            wrapperClassName={styles["description-wrapper"]}
                            editorClassName={styles["description-editor"]}
                            onEditorStateChange={onDescriptionChange}
                            editorStyle={{ maxHeight: '200px', overflowY: 'auto' }}
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="template-area">Code Template:</label>
                        <textarea
                            id="template-area"
                            name="codeTemplate"
                            rows="4"
                            cols="50"
                            placeholder={`def fn_name(param1, param2):\n  // Enter your code here` }
                            value={codeTemplate}
                            onChange={onCodeTemplateChange}
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="inputs">Test Case Inputs:</label>
                        <input 
                            type="text"
                            placeholder={`[{ "arg1": 5, "arg2": 6 }, { "arg1": 7, "arg2": 8}]`} 
                            name="inputs" 
                            id="inputs"
                            value={testCaseInputs} 
                            onChange={onTestCaseChange} 
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="outputs">Expected Outputs:</label>
                        <input 
                            type="text"
                            placeholder="['firstExpected', 'secondExpected']" 
                            name="outputs" 
                            id="outputs"
                            value={expectedOutputs} 
                            onChange={onExpectedOutputChange} 
                        />
                    </div>
                    { errorMessage &&
                        <p className={styles["error-msg"]}>{errorMessage}</p>
                    }
                    <button className={styles["submit-btn"]} onClick={submitHandler}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
};

export default AddQuestionModal;