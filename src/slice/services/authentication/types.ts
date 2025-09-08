export interface LoginResponse {
    authentication: {
        name: string;
        attributes: {
            access_token: string;
            refresh_token: string;
            token_type: string;
            expires_in: number;
            roles?: string[];
        };
    };
    authenticated: boolean;
}
