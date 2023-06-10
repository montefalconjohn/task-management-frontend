type Task = {
    id: string;
    attributes: {
        name: string
    };
    relationships: {
        statuses: {
            attributes: {
                statusName: string
            }
        }
    };
}

const taskDefaultValue = () => {
    return {
        id: "",
        attributes: {
            name: ""
        },
        relationships: {
            statuses: {
                attributes: {
                    statusName: ""
                }
            }
        }
    }
};

export default taskDefaultValue;