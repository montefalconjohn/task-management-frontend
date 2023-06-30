export interface Status {
    id: string;
    attributes: {
        statusName: string
    };
}

const statusDefaultValue = () => {
    return {
        id: "",
        attributes: {
            statusName: ""
        }
    }
};

export default statusDefaultValue;