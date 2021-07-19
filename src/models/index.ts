import registerUserModel from "./users/User"
import registerRoleModel from "./users/Role"
import registerPermissionModel from "./users/Permission"

import registerSpellModel from "./spells/Spell"
import registerSchoolModel from "./spells/School"
import registerMetaSchoolModel from "./spells/MetaSchool"

const models = [
    registerUserModel,
    registerRoleModel,
    registerPermissionModel,

    registerSpellModel,
    registerSchoolModel,
    registerMetaSchoolModel,
]

export default () => {
    models.forEach((registerModel) => {
        registerModel()
    })
}
