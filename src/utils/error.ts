class BaseError extends Error {

    data?: any;
    description: string;

    constructor(options: {
        description: string,
        data?: any
    }) {

        super(options.description);

        this.data = options.data;
        this.description = options.description;
    }

}

export default BaseError;