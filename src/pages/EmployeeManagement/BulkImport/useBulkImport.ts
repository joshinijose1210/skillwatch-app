import { ErrorType } from '@common';
import { routeConstants } from '@constants';
import apiUrls from '@constants/apiUrls';
import { addToast } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useAddBulkEmployeeMutation, useAddBulkKpiMutation } from '@slice/services';
import { downloadCSV } from '@utils/downloadCSV';
import downloadErrors from '@utils/downloadErrors';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocationState } from './types';

const useBulkImport = () => {
    const userDetails = useAppSelector(state => state.user);
    const location = useLocation();
    const path = location.pathname;
    const { bulkImportType } = location.state as LocationState;
    const navigate = useNavigate();
    const [addBulkEmployee, { isLoading: bulkEmployeeLoading, error: bulkEmployeeError, isSuccess: bulkEmployeeSucceed }] =
        useAddBulkEmployeeMutation();
    const [addBulkKpi, { isLoading: bulkKpiLoading, error: bulkKpiError, isSuccess: bulkKpiSucceed, data }] = useAddBulkKpiMutation();
    const error = bulkImportType === 'kpis' ? bulkKpiError : bulkEmployeeError;
    const isLoading = bulkKpiLoading || bulkEmployeeLoading;
    const isSuccess = bulkImportType === 'kpis' ? bulkKpiSucceed : bulkEmployeeSucceed;
    const [csvFile, setFiles] = useState<string | Blob>('');
    const [fileName, setFileName] = useState('');
    const [importError, setImportError] = useState('');
    const errorObj = error as ErrorType;
    const onDrop = useCallback(
        (files: File[]) => {
            setFiles(files[0]);
            setFileName(files[0].name);
            setImportError('');
            addToast({
                variant: 'success',
                header: 'File uploaded successfully',
                timer: 3000
            });
        },
        [setFiles]
    );
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv']
        }
    });

    const reset = useCallback(() => {
        setFileName('');
        setImportError('');
    }, [setFileName]);

    const handleBulkUpload = () => {
        const formData = new FormData();
        formData.append('file', csvFile);
        formData.append('organisationId', userDetails.organisationId.toString());
        formData.append('actionBy', userDetails.id.toString());
        formData.append('ipAddress', '216.24.57.253:443');
        bulkImportType === 'kpis' ? addBulkKpi(formData) : addBulkEmployee(formData);
    };

    const handleDownloadFile = () => {
        downloadCSV(`${apiUrls[bulkImportType === 'kpis' ? 'kpi' : 'mutateEmployeeList']}/template`, 'template');
    };

    const goBackHandle = () => {
        navigate(routeConstants.firstEmployee);
    };

    useEffect(() => {
        if (isSuccess) {
            setFileName('');
            setImportError('');
            addToast({
                variant: 'success',
                header: data?.message || 'Upload successful!',
                timer: 3000
            });
        }
        if (errorObj && typeof errorObj === 'object' && errorObj.data) {
            let errorFileName = '';
            downloadErrors(fileName, errorObj.data?.file as string);
            errorFileName = fileName;
            setImportError(`${errorFileName}, contains errors, you can check in downloaded file`);
            setFileName('');
            addToast({
                variant: 'error',
                header: errorObj.data?.message || 'Unable to upload file due to error.',
                timer: 7000
            });
        }
        // eslint-disable-next-line
    }, [isSuccess, error]);

    return {
        handleBulkUpload,
        errorObj,
        isLoading,
        isSuccess,
        handleDownloadFile,
        importError,
        fileName,
        reset,
        getRootProps,
        getInputProps,
        goBackHandle,
        path,
        bulkImportType
    };
};

export default useBulkImport;
