import React from "react"
import { Route, Routes } from "react-router-dom"
import NavBar from "../components/ui/NavBar"
import Home from "../components/ui/Home"
import Estados from "../components/estados/Estados"
import Marcas from "../components/marcas/Marcas"
import Tipos from "../components/tipos/Tipos"
import Usuarios from "../components/usuarios/Usuarios"
import Inventarios from "../components/inventarios/Inventarios"
import NotFound from "../components/ui/NotFound"

export default function AppRouter() {
    return (
        <div>
            <NavBar title={'IE EL ROSARIO'} />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/inventarios" element={<Inventarios />} />
                    <Route path="/estados" element={<Estados />} />
                    <Route path="/marcas" element={<Marcas />} />
                    <Route path="/tipos" element={<Tipos />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    )
}