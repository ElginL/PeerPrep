import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import CategoryDropdown from './CategoryDropdown';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import styles from '../styles/components/AddQuestionModal.module.css';
import AddIcon from '@mui/icons-material/Add';
import { addQuestion } from '../api/questions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddQuestionForm = ({ isVisible, setIsVisible}) => {
    const [description, setDescription] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [complexity, setComplexity] = useState("Easy");
    const [errorMessage, setErrorMessage] = useState("");
    const [testCaseInputs, setTestCaseInputs] = useState("");
    const [expectedOutputs, setExpectedOutputs] = useState("");
    const [codeTemplateFields, setCodeTemplateFields] = useState([
        { language: 'Python', template: '' }
    ]);

    useEffect(() => {
        if (isVisible) {
          document.documentElement.style.overflow='hidden';
        } else {
          document.documentElement.style.overflow='unset';
        }
      }, [isVisible]);

      const submitHandler = async e => {
        e.preventDefault();

        const stringifiedDescription = draftToHtml(convertToRaw(description.getCurrentContent()));
        
        if (stringifiedDescription.trim() === "<p></p>" || title.trim().length === 0 || 
            categories.length === 0 || codeTemplateFields.length === 0 || testCaseInputs.trim() === "" || expectedOutputs.trim() === "") {
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
            categories, 
            complexity, 
            stringifiedDescription, 
            testCaseInputsArr, 
            expectedOutputsArr,
            codeTemplateFields
        );

        if (response.status !== 201) {
            setErrorMessage(response.message);
            return;
        }
        
        setIsVisible(false);
        setErrorMessage("");
        setTitle("");
        setDescription(EditorState.createEmpty());
        setCategories([]);
        setComplexity("Easy")
        setTestCaseInputs("");
        setExpectedOutputs("");
        setCodeTemplateFields([ { language: 'Python', template: '' } ]);
    };

    const updateCodeTemplate = (index, field, event) => {
        const values = [...codeTemplateFields];
        values[index][field] = event.target.value;
        setCodeTemplateFields(values);
      };
    

    const addCodeTemplate = () => {
        setCodeTemplateFields([...codeTemplateFields, { language: 'Python', template: '' }])
    }

    const removeCodeTemplate = index => {
        let data = [...codeTemplateFields];
        data.splice(index, 1);
        setCodeTemplateFields(data);
    }

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={isVisible}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    >
                    <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Add Question
                    </Typography>
                    <Button autoFocus color="inherit" onClick={submitHandler}>
                        save
                    </Button>
                </Toolbar>
                </AppBar>
                <Box component="form" noValidate sx={{ mt: 1, margin: '50px' }} style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    { errorMessage &&
                        <p className={styles["error-msg"]}>{errorMessage}</p>
                    }
                    <TextField
                        required
                        fullWidth
                        id=""
                        label="Question Title"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <CategoryDropdown 
                        setCategories={setCategories}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="complexity-label">Complexity</InputLabel>
                        <Select
                            labelId="complexity-label"
                            id="complexity"
                            value={complexity}
                            label="Complexity"
                            onChange={e => setComplexity(e.target.value)}
                        >
                            <MenuItem value={'Easy'}>Easy</MenuItem>
                            <MenuItem value={'Medium'}>Medium</MenuItem>
                            <MenuItem value={'Hard'}>Hard</MenuItem>
                        </Select>
                    </FormControl>
                    <InputLabel id="question-description">Question Description</InputLabel>
                    <Editor
                        labelId="question-description"
                        editorState={description}
                        wrapperClassName={styles["description-wrapper"]}
                        editorClassName={styles["description-editor"]}
                        onEditorStateChange={description => setDescription(description)}
                        editorStyle={{ height: '200px', overflowY: 'auto' }}
                    />
                    <InputLabel id="code-template">Code Boilerplates</InputLabel>
                    <div className={styles["code-template-outer"]}>
                        {codeTemplateFields.map((field, index) => (
                            <div key={index} className={styles["code-template-container"]}>
                                <FormControl>
                                    <InputLabel id="code-language">Language</InputLabel>
                                    <Select
                                        labelId="code-language"
                                        id="code-language"
                                        value={field.language}
                                        label={`Language ${index + 1}`}
                                        onChange={e => updateCodeTemplate(index, 'language', e)}
                                    >
                                        <MenuItem value={'Python'}>Python</MenuItem>
                                        <MenuItem value={'Java'}>Java</MenuItem>
                                        <MenuItem value={'Javascript'}>Javascript</MenuItem>
                                    </Select>
                                </FormControl>
                                <textarea
                                    placeholder={`Code Template ${index + 1}`}
                                    value={field.template}
                                    onChange={(e) => updateCodeTemplate(index, 'template', e)}
                                    cols={50}
                                    className={styles["code-template-textarea"]}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => removeCodeTemplate(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addCodeTemplate}
                            startIcon={<AddIcon />}
                        >
                            Add Code Template
                        </Button>
                    </div>
                    <InputLabel id="test-cases">Test Case Inputs</InputLabel>
                    <TextField
                        required
                        fullWidth
                        id=""
                        label={`e.g. [{ "arg1": 5, "arg2": 6 }, { "arg1": 7, "arg2": 8}]`}
                        name="testCaseInputs"
                        autoComplete="testCaseInputs"
                        value={testCaseInputs}
                        onChange={(e) => setTestCaseInputs(e.target.value)}
                    />
                    <InputLabel id="expectedOutputs">Expected Outputs</InputLabel>
                    <TextField
                        required
                        fullWidth
                        id=""
                        label={`e.g. ["firstExpected", "secondExpected"]`}
                        name="expectedOutputs"
                        autoComplete="expectedOutputs"
                        value={expectedOutputs}
                        onChange={(e) => setExpectedOutputs(e.target.value)}
                    />
                </Box>
            </Dialog>
        </div>
    );
}

export default AddQuestionForm;