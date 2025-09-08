declare const process: {
    env: {
        REACT_APP_CLIENT_ID: string;
        API_URL: string;
        MICROSOFT_ID: string;
        ZOHO_CLIENT_ID: string;
        ZOHO_CLIENT_SECRET: string;
        YOUTUBE_API_KEY: any;
        SLACK_CLIENT_ID: string;
        SLACK_STATE: string;
        LOGIN_URL: string;
        APP_URL: string;
        MODE: string;
        NODE_ENV?: string;
    };
};

declare module '*.svg' {
    const content: any;
    export default content;
}
