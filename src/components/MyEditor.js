import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

function MyEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Custom style map for text colors, underline, etc.
  const styleMap = {
    RED_TEXT: {
      color: "red",
    },
    // Add other custom styles here
  };

  // Load the initial content from local storage when the component mounts
  useEffect(() => {
    const content = window.localStorage.getItem("editorContent");
    if (content) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      );
    }
  }, []);

  const saveContent = () => {
    const content = editorState.getCurrentContent();
    window.localStorage.setItem(
      "editorContent",
      JSON.stringify(convertToRaw(content))
    );
  };

  const handleBeforeInput = (char, editorState) => {
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const blockText = currentBlock.getText();
    const blockType = currentBlock.getType();

    if (char !== " ") return "not-handled";

    let newEditorState = editorState;
    switch (blockText) {
      case "#":
        newEditorState = RichUtils.toggleBlockType(editorState, "header-one");
        break;
      case "*":
        newEditorState = RichUtils.toggleInlineStyle(editorState, "BOLD");
        break;
      case "**":
        newEditorState = RichUtils.toggleInlineStyle(editorState, "RED_TEXT");
        break;
      case "***":
        newEditorState = RichUtils.toggleInlineStyle(editorState, "UNDERLINE");
        break;
      case "```":
        newEditorState = RichUtils.toggleBlockType(editorState, "code-block");
        break;
    }

    if (newEditorState !== editorState) {
      const targetLength = blockText === "```" ? 3 : blockText.length;
      // Remove the special character(s) or sequences for code block
      const newContentState = Modifier.replaceText(
        newEditorState.getCurrentContent(),
        selection.merge({
          anchorOffset: 0,
          focusOffset: targetLength,
        }),
        ""
      );
      setEditorState(
        EditorState.push(newEditorState, newContentState, "change-block-type")
      );
      return "handled";
    }

    return "not-handled";
  };

  return (
    <div className="p-4">
      <div className="border bg-white/50 border-black p-4 min-h-64 text-black">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleBeforeInput={handleBeforeInput}
          customStyleMap={styleMap}
        />
      </div>
      <br/>
      <button
        onClick={saveContent}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
      >
        Save
      </button>
    </div>
  );
}

export default MyEditor;
