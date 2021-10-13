import React from "react";
import Kanban from './components/kanban/Kanban';
import initialData from "./components/testdata";
export default function App() {
    return (
        <div>
            <Kanban {...initialData} />
        </div>
    );
}