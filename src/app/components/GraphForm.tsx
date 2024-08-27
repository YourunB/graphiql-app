'use client'
import s from './GraphForm.module.css';
import checkAuth from '../utils/checkAuth';
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github'
import { useRef, useCallback, useState } from 'react';

export default function GraphForm() {
  const inputRef = useRef(null);
  
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

  const onChange = useCallback((val, viewUpdate) => {
    console.log(viewUpdate);
    setqueryValue(val);
  }, []);


  const url = 'https://rickandmortyapi.com/graphql';
  const variables = {
    page: 2,
    name: "rick"
  };
  const headers = {
    'Content-Type': 'application/json',
  };
  
  const getDataGraphApi = (url: string, query: string, variablesObj = {}, headersObj = {}) => {
    fetch(url, {
      method: 'POST',
      headers: headersObj ? headersObj : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variablesObj }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }


  checkAuth();

  return (
    <div className={s['graph-form']}>
      <input defaultValue={'https://rickandmortyapi.com/graphql'} ref={inputRef} placeholder='Base URL...'/><button>fix</button><button>+</button><button onClick={() => getDataGraphApi(url, queryValue, variables, '')}>&#10003;</button>
      <CodeMirror value={queryValue} height="600px" extensions={[javascript({ jsx: true })]} onChange={onChange} theme={githubDark} />;
    </div>
  );
}

