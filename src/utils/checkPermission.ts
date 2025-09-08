export const checkPermission = (name: string, modulePermission: any) => {
    let isPermitted = false;
    const module = modulePermission?.find((module: any) => module.moduleName === name);
    if (module) {
        isPermitted = module.edit || module.view || false;
    }
    return isPermitted;
};
