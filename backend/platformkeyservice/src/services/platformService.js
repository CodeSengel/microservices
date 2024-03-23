
const useApi = require('./useApi');

const api = useApi();

let user = null

function platformKeyFactory() {
    

    
    const getAvailablePlatformList = async (authorization, refreshToken) => {
        user = await api.checkIfUserIsConnected(authorization, refreshToken);
        let data = '';
        if (user !== null) {
            console.log('user available');
            try {
                data = await api.list(process.env.TAB_PLATFORM_LIST_NAME);
            } catch (error) {
                throw error;
            }
        } else {
            console.log('user null');
        }
        
        return data;
    };

    return {
        getAvailablePlatformList
    };
}

module.exports = platformKeyFactory;
