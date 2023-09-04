import { useState, useRef, useEffect } from 'react';
import styles from '../styles/components/AddQuestionModal.module.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const AddQuestionModal = ({ isVisible, setIsVisible }) => {
    const containerStyle = isVisible ? "container-visible" : "container-not-visible";

    const [description, setDescription] = useState(EditorState.createEmpty());

    const onDescriptionChange = (description) => {
        setDescription(description);
    };

    const modalRef = useRef(null);
    useEffect(() => {
        if (modalRef.current) {
            requestAnimationFrame(() => {
                modalRef.current.scrollTop = modalRef.current.scrollHeight;
            });
        }
    }, [description]);

    // console.log(draftToHtml(convertToRaw(description.getCurrentContent())));

    return (
        <div className={styles[containerStyle]} onClick={() => setIsVisible(false)}>
            <div className={styles["form-container"]} onClick={e => e.stopPropagation()} ref={modalRef}>
                <h2>Add Question</h2>
                <form className={styles["form"]}>
                    <div className={styles["input-container"]}>
                        <label htmlFor="title">Title:</label>
                        <input type="text" placeholder="New Title" name="title" id="title" />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="category">Category:</label>
                        <input type="text" placeholder="Category (e.g. Binary Search)" name="category" id="category" />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="complexity">Complexity:</label>
                        <select name="complexity" id="complexity" className={styles["complexity-container"]}>
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
                </form>
            </div>
        </div>
    )
};

export default AddQuestionModal;