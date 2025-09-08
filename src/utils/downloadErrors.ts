const downloadErrors = (fileName: string, errors: string) => {
    const dataInCSV = errors;
    const url = window.URL.createObjectURL(new Blob(['\ufeff', dataInCSV]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName.split('.csv')[0]}-errors.csv`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
};

export default downloadErrors;
