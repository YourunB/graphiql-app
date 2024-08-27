'use client'
import s from './GraphForm.module.css';
import checkAuth from '../utils/checkAuth';
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github'
import { useRef, useCallback, useState } from 'react';
import { formatCode } from '../utils/formatCode';

export default function GraphForm() {
  const inputRef = useRef(null);
  const resultCodeMirrorRef = useRef(null);
  const [showVariables, setShowVariables] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);
  const [queryValue, setqueryValue] = useState(`
    query {
      characters(page: 2, filter: { name: "rick" }) {
        info {
          count
        }
        results {
          name
        }
      }
      location(id: 1) {
        id
      }
      episodesByIds(ids: [1, 2]) {
        id
      }
    }
  `);
  const [variablesValue, setVariablesValue] = useState('');
  const [headersValue, setHeadersValue] = useState('');
  const [resultValue, setResultValue] = useState('');

  const onChangeQuery = useCallback((val, viewUpdate) => {
    console.log(viewUpdate);
    setqueryValue(val);
  }, []);

  const onChangeVariables = useCallback((val, viewUpdate) => {
    console.log(viewUpdate);
    setVariablesValue(val);
  }, []);

  const onChangeHeaders = useCallback((val, viewUpdate) => {
    console.log(viewUpdate);
    setHeadersValue(val);
  }, []);

  const onChangeResult = useCallback((val, viewUpdate) => {
    console.log(viewUpdate);
    setResultValue(val);
  }, []);

  //const url = 'https://rickandmortyapi.com/graphql';
  //const variables = {
  //  page: 2,
  //  name: "rick"
  //};
  //const headers = {
  //  'Content-Type': 'application/json',
  //};
  
  const getDataGraphApi = (url: string, query: string, variablesObj = {}, headersObj = {}) => {
    fetch(url, {
      method: 'POST',
      headers: headersObj ? headersObj : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variablesObj }),
    })
      .then(response => response.json())
      .then(data => setResultValue(JSON.stringify(data)))
      .catch(error => console.error('Error:', error));
  }

  const toggleShowVariables = () => {
    setShowVariables(!showVariables);
    if (showHeaders) setShowHeaders(!showHeaders);
  }

  const toggleShowHeaders = () => {
    setShowHeaders(!showHeaders);
    if (showVariables) setShowVariables(!showVariables);
  }

  checkAuth();

  const format = async (code: string) => {
    if (code) {
      const resultFormat = await formatCode(code, 'graphql');
      console.log(resultFormat);
    }
  }

  return (
    <div className={s['graph-form']}>
      <div className={s.top}>
        <input className={s['top__input']} defaultValue={'https://rickandmortyapi.com/graphql'} ref={inputRef} placeholder='Base URL...'/>
        <button className={s['top__btn']} onClick={() => format(queryValue)}>fix</button>
        <button className={s['top__btn']}>+</button>
        <button className={s['top__btn']} onClick={() => getDataGraphApi(inputRef.current.value, queryValue, variablesValue, headersValue)}>&#10003;</button>
      </div>
      
      <div className={s.box}>
        <div className={s['form-left']}>
          <CodeMirror value={queryValue} height="600px" extensions={[javascript({ jsx: true })]} onChange={onChangeQuery} theme={githubDark} />
          <button className={`${s['btn-toggle']} ${showVariables ? s['btn-toggle_active'] : ''}`} onClick={() => toggleShowVariables()}>Variables</button><button className={`${s['btn-toggle']} ${showHeaders ? s['btn-toggle_active'] : ''}`} onClick={() => toggleShowHeaders()}>Headers</button>
          {showVariables ? <CodeMirror value={variablesValue} height="200px" extensions={[javascript({ jsx: true })]} onChange={onChangeVariables} theme={githubDark} /> : null}
          {showHeaders ? <CodeMirror value={headersValue} height="200px" extensions={[javascript({ jsx: true })]} onChange={onChangeHeaders} theme={githubDark} /> : null}
        </div>

        <div className={s['form-right']}>
          <CodeMirror ref={resultCodeMirrorRef} value={resultValue} height="600px" extensions={[javascript({ jsx: true })]} onChange={onChangeResult} theme={githubDark} readOnly/>
        </div>
      </div>

    </div>
  );
}

