import { List  } from 'immutable';

export const toImmutable = (payload, Model) => {
    return new List(
        Object.entries(payload).map(([id, value]) => new Model({id, ...value}))
    )
}
