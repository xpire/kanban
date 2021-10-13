import React from "react";
import Kanban from './components/kanban/Kanban';
import Menu from './components/menu/Menu';
import initialData from "./components/testdata";

export default function App() {
    return (
        <div>
            <Kanban {...initialData} />
            <Menu />
        </div>
    );
}