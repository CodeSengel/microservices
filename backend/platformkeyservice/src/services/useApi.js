const { useSupabase } = require('../supabase');


function useApi() {
    const { supabase } = useSupabase();

    const checkIfUserIsConnected = async (authorization, refreshToken) => {
        console.log('dans le service', authorization);
        console.log('dans le service', refreshToken);
        let user = null

        if (refreshToken && authorization) {
            const temp = await supabase.auth.setSession({
                refresh_token: refreshToken,
                access_token: authorization.split(' ')[1],
                auth: { persistSession: false }
            });

            user = temp.data.user
       
        } else {
            throw new Error('User is not authenticated.');
            
        }

        return user
    };


    const list = async (table) => {
        console.log('je vais appeler')
      
        const { data, error } = await supabase.from(table).select("*");
        if (error) throw error;

        console.log('là j\' appele ', data)
        return data;
      };

        
    return {
        list,
        checkIfUserIsConnected
    }
}

module.exports = useApi;
