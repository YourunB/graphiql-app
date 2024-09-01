'use client';
import s from './GraphForm.module.css';
import React, { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github';
import { useRef, useCallback, useState } from 'react';
import { formatCode } from '../utils/formatCode';
import { getDataGraphApi } from '../modules/api';
import { encodeBase64 } from '../modules/encodeBase64';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { RestData, saveDataFromRest } from '../utils/saveData';
import { useDecodedUrl } from '../utils/useDecodedUrl';
import { usePathname } from 'next/navigation';
import useCheckAuth from '../utils/useCheckAuth';

export default function GraphForm() {
  const pathname = usePathname();
  const data = useDecodedUrl();
  const [user, loading] = useAuthState(auth);
  const resultCodeMirrorRef = useRef(null);
  const [showVariables, setShowVariables] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);
  const [inputValue, setInputValue] = useState('https://rickandmortyapi.com/graphql');
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

  useEffect(() => {
    if (loading) return;
    if (data) {
      const { headers, input, query, variables } = data;
      setHeadersValue(headers || '');
      setVariablesValue(variables || '');
      setQueryValue(query || '');
      setInputValue(input || '');
    }
  }, [loading, data]);

  const createUrl = (value?: string) => {
    const pathParts = pathname.split('/').filter(Boolean);
    const language = pathParts[0] || 'en';
    const url = new URL(
      `${location.origin}/${language}/POST/${encodeBase64(value || inputValue)}/${encodeBase64(queryValue)}`
    );
    const params = new URLSearchParams();

    if (headersValue) params.append('headers', encodeBase64(headersValue));
    if (variablesValue) params.append('variables', encodeBase64(variablesValue));

    url.search = params.toString();
    window.history.pushState({}, '', url);
  };

  const handleBlur = () => {
    createUrl(inputValue);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    createUrl(value);
    setInputValue(value);
  };

  const onChangeQuery = useCallback((val: string) => {
    setQueryValue(val);
  }, []);

  const onChangeVariables = useCallback((val: string) => {
    setVariablesValue(val);
  }, []);

  const onChangeHeaders = useCallback((val: string) => {
    setHeadersValue(val);
  }, []);

  const onChangeResult = useCallback((val: string) => {
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

  useCheckAuth();

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
    const data = await getDataGraphApi(inputValue, queryValue, variablesValue, headersValue);
    const result = JSON.stringify(data);
    format(result, 'json', 'result');

    const dataToSave: RestData = {
      input: inputValue,
      query: queryValue,
      variables: variablesValue,
      headers: headersValue,
      method: 'graph',
    };

    if (user) saveDataFromRest(dataToSave, user?.email);
  };

  return (
    <div className={s['graph-form']}>
      <div className={s.top}>
        <input className={s['top__input']} value={inputValue} onChange={onChangeInput} placeholder="Base URL..." />
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
