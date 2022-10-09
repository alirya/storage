import {EntityManager, Like} from "typeorm";
import ReadsNamespace from "../database/raw-reads";
import ToRecord from "../mapper/record/to-record";
import Storage from "../database/storage";
import AddNamespace from "../../../string/add-namespace";
import {Required} from "utility-types";
import RemoveNamespace from "../database/remove-namespace";

export default function Reads<Type extends Record<string, any>>(
    manager : EntityManager,
    namespace: string,
    entity: typeof Storage,
) : Promise<Type> {


    const id = AddNamespace('', namespace) + '%';

    return ReadsNamespace(manager, { where: { id:Like(id) } }, entity)
        .then(records=>records
            .map(record=>RemoveNamespace(record, namespace))
        )
        .then(records=>{

        return ToRecord(records as Required<Storage, 'id'|'value'>[]) as Type;
    })
}
