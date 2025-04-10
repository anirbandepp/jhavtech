import { Routes, Route } from "react-router-dom";

import { lazy, Suspense } from 'react';

import Loader from "./components/PreLoader/Loader";

const HomePage = lazy(() => import('./pages/HomePage'));
const EmployeeTree = lazy(() => import('./pages/EmployeeTree'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

const App = () => {

  return (
    <Suspense fallback={<Loader />}>

      <Routes>

        <Route path="/" exact element={<HomePage />} />

        <Route path="/employee-tree" exact element={<EmployeeTree />} />

        <Route path="/*" exact element={<PageNotFound />} />

      </Routes>

    </Suspense>
  )
}

export default App;