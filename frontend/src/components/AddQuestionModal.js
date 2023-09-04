import { useState, useRef, useEffect } from 'react';
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

    const submitHandler = async e => {
        
        const stringifiedDescription = draftToHtml(convertToRaw(description.getCurrentContent()));
        
        if (stringifiedDescription.trim() === "<p></p>" || title.trim().length === 0 || category.trim().length === 0) {
            e.preventDefault();
            setErrorMessage("Submit failed. All fields must be filled");
            return;
        }

        await addQuestion(title, category, complexity, stringifiedDescription);
    };

    const modalRef = useRef(null);
    useEffect(() => {
        if (modalRef.current) {
            requestAnimationFrame(() => {
                modalRef.current.scrollTop = modalRef.current.scrollHeight;
            });
        }
    }, [description]);
    
    return (
        <div className={styles[containerStyle]} onClick={() => setIsVisible(false)}>
            <div className={styles["form-container"]} onClick={e => e.stopPropagation()} ref={modalRef}>
                <h2>Add Question</h2>
                <form className={styles["form"]}>
                    <div className={styles["input-container"]}>
                        <label htmlFor="title">Title:</label>
                        <input 
                            type="text" 
                            placeholder="New Title" 
                            name="title" 
                            id="title" 
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
                            onChange={onCategoryChange} 
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="complexity">Complexity:</label>
                        <select 
                            name="complexity" 
                            id="complexity" 
                            className={styles["complexity-container"]}
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
                        />
                    </div>
                    <p className={styles["error-msg"]}>{errorMessage}</p>
                    <button className={styles["submit-btn"]} onClick={submitHandler}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
};

export default AddQuestionModal;