'use client'
import s from './GraphForm.module.css';
import checkAuth from '../utils/checkAuth';
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github'

export default function GraphForm() {
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log(viewUpdate);
    setValue(val);
  }, []);

  checkAuth();

  return (
    <div className={s['graph-form']}>
      Graph form...
      <CodeMirror value={value} height="200px" extensions={[javascript({ jsx: true })]} onChange={onChange} theme={githubDark} />;
    </div>
  );
}

