'use client';
import s from './GraphForm.module.css';
import checkAuth from '../utils/checkAuth';
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github';
import { useRef, useCallback, useState } from 'react';
import { formatCode } from '../utils/formatCode';
import { getDataGraphApi } from '../modules/api';
import { encodeBase64 } from '../modules/encodeBase64';

export default function GraphForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const resultCodeMirrorRef = useRef(null);
  const [showVariables, setShowVariables] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);
  const [queryValue, setQueryValue] = useState(`
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

  const handleBlur = () => {
    const url = new URL(`${location.origin}/POST/${encodeBase64(inputRef.current?.value)}/${encodeBase64(queryValue)}`);
    const params = new URLSearchParams(url.search);
    if (headersValue) params.append('headers', encodeBase64(headersValue));
    if (variablesValue) params.append('variables', encodeBase64(variablesValue));
    window.history.pushState({}, '', url);
  };

  const onChangeQuery = useCallback((val, viewUpdate) => {
    console.log(viewUpdate);
    setQueryValue(val);
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

  const toggleShowVariables = () => {
    setShowVariables(!showVariables);
    if (showHeaders) setShowHeaders(!showHeaders);
  };

  const toggleShowHeaders = () => {
    setShowHeaders(!showHeaders);
    if (showVariables) setShowVariables(!showVariables);
  };

  checkAuth();

  const format = async (code: string, type: string, area: string) => {
    if (code && type) {
      const resultFormat = await formatCode(code, type);
      if (typeof resultFormat === 'string') {
        if (area === 'query') setQueryValue(resultFormat);
        if (area === 'variables') setVariablesValue(resultFormat);
        if (area === 'headers') setHeadersValue(resultFormat);
        if (area === 'result') setResultValue(resultFormat);
      }
    }
  };

  const formatAllAreas = () => {
    format(queryValue, 'graphql', 'query');
    format(variablesValue, 'json', 'variables');
    format(headersValue, 'json', 'headers');
  };

  const loadDataFromApi = async () => {
    const data = await getDataGraphApi(inputRef.current?.value, queryValue, variablesValue, headersValue);
    const result = JSON.stringify(data);
    format(result, 'json', 'result');
  };

  return (
    <div className={s['graph-form']}>
      <div className={s.top}>
        <input
          className={s['top__input']}
          defaultValue={'https://rickandmortyapi.com/graphql'}
          ref={inputRef}
          onChange={handleBlur}
          placeholder="Base URL..."
        />
        <button className={s['top__btn']} title="Format Code" onClick={() => formatAllAreas()}>
          &#182;
        </button>
        <button className={s['top__btn']} title="Submit Endpoint">
          &#8226;
        </button>
        <button className={s['top__btn']} title="Execute Query" onClick={() => loadDataFromApi()}>
          &#10003;
        </button>
      </div>

      <div className={s.box}>
        <div className={s['form-left']}>
          <CodeMirror
            value={queryValue}
            height="600px"
            extensions={[javascript({ jsx: true })]}
            onChange={onChangeQuery}
            onBlur={handleBlur}
            theme={githubDark}
          />
          <button
            className={`${s['btn-toggle']} ${showVariables ? s['btn-toggle_active'] : ''}`}
            onClick={() => toggleShowVariables()}
          >
            Variables
          </button>
          <button
            className={`${s['btn-toggle']} ${showHeaders ? s['btn-toggle_active'] : ''}`}
            onClick={() => toggleShowHeaders()}
          >
            Headers
          </button>
          {showVariables ? (
            <CodeMirror
              value={variablesValue}
              height="200px"
              extensions={[javascript({ jsx: true })]}
              onChange={onChangeVariables}
              onBlur={handleBlur}
              theme={githubDark}
            />
          ) : null}
          {showHeaders ? (
            <CodeMirror
              value={headersValue}
              height="200px"
              extensions={[javascript({ jsx: true })]}
              onChange={onChangeHeaders}
              onBlur={handleBlur}
              theme={githubDark}
            />
          ) : null}
        </div>

        <div className={s['form-right']}>
          <CodeMirror
            ref={resultCodeMirrorRef}
            value={resultValue}
            height="600px"
            extensions={[javascript({ jsx: true })]}
            onChange={onChangeResult}
            theme={githubDark}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
