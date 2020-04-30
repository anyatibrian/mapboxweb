import React from "react"
import RouterDom from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd/dist/antd.less'
import App from './src/containers/App'
import './src/styles/app.less'

RouterDom.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById("root"))