import dynamic from "next/dynamic";
import React, { useState } from "react";
import MyEditor from "../components/MyEditor";
import { axios } from "../lib/axiosInstance";

const Editor = dynamic(() => import("../components/MyEditor"), {
    ssr: false,
});

export default function test() {
    const [editor, setEditor] = useState("");

    return (
        <div>
            <Editor
                label={"Deskripsi"}
                handleChange={(data) => {
                    setEditor(data);
                }}
                data={editor}
                // editorLoaded={editorLoaded}
            />
        </div>
    );
}

// export async function getServerSideProps() {
//     let data = [];
//     await axios.get("/projects").then((response) => {
//         data = response.data.projects;
//     });

//     return {
//         props: {
//             data,
//         },
//     };
// }
