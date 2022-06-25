import React, { useRef, useMemo } from 'react'
import JoditEditor from 'jodit-react'
import Jodit from 'jodit'

const RichTextEditor = ({ value, setValue }) => {

    const editor = useRef("");

    const config =
    {
        minHeight:500
    }


    return (

        <JoditEditor
            ref={editor}
            // value={content}
            config={config}
            // tabIndex={1} // tabIndex of textarea
            // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            // onChange={(e) => setValue({ ...value, description: e })}
            onBlur={(e) => setValue({ ...value, description: e })}
        />

    )
}

export default RichTextEditor