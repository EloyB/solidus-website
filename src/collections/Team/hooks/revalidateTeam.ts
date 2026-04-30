import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

export const revalidateTeam: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating home page for team member update`)
    revalidatePath('/')
  }

  return doc
}
