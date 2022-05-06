interface MuxConfig {
    configs: { [key: string]: Promise<any> }
    onResolve: (configKey: string | string[]) => Promise<any>
}

(function (config?: MuxConfig) {
    console.log('MUX_CONFIG INIT')
    // const host = 'http://localhost:8081'
    const host = 'https://mux-world.github.io/assets'
    const configs = new Map<string, string>([
        ['token', 'src/config/assets/token.json'],
    ])

    if (!config) {
        window.MUX_CONFIG = config = {
            configs: {},
            onResolve: async (configKey: string | string[]) => {
                if (configKey instanceof Array) {
                    return Promise.all(configKey.map(key => window.MUX_CONFIG.configs[key]))
                } else {
                    return window.MUX_CONFIG.configs[configKey]
                }
            }
        }
    }

    const fetchFunc = async (uri: string, retryTimes = 5): Promise<Response> => {
        try {
            return await fetch(`${host}/${uri}`)
        } catch (e) {
            if (retryTimes > 0) {
                console.log('retry fetch time', 6 - retryTimes, uri)
                return await fetchFunc(uri,retryTimes - 1)
            }
            throw e
        }
    }

    configs.forEach((uri, key) => {
        window.MUX_CONFIG.configs[key] = (async () => {
            return (await fetchFunc(uri)).json()
        })()
    })

})(window.MUX_CONFIG)
