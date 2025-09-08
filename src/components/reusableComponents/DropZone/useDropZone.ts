import { setLogoError } from '@slice/logoError';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDropZoneProps } from './types';

const useDropZone = ({ onDrop, accept }: useDropZoneProps) => {
    const dispatch = useDispatch();
    const path = useLocation().pathname;
    const [importError, setImportError] = useState('');

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept
    });

    const reset = () => {
        setImportError('');
        onDrop([]);
        dispatch(setLogoError(''));
    };
    useEffect(() => {
        dispatch(setLogoError(importError));
    }, [dispatch, importError]);

    return {
        importError,
        setImportError,
        reset,
        getRootProps,
        acceptedFiles,
        getInputProps,
        path,
        dispatch,
        setLogoError
    };
};

export default useDropZone;
