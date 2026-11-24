
import Dexie from "dexie";

export const db = new Dexie("ZachariahStitchesDB");

db.version(1).stores({
  measurements: "id, customerId, measurementCategory, synced, createdAt"
  });

  export async function saveOfflineMeasurement(measurement) {
    const id = crypto.randomUUID();

      await db.measurements.add({
          ...measurement,
              id,
                  unit: "inches",
                      synced: 0,
                          createdAt: new Date().toISOString()
                            });

                              return id;
                              }

                              export async function getPendingMeasurements() {
                                return db.measurements
                                    .where("synced")
                                        .equals(0)
                                            .toArray();
                                            }

                                            export async function markMeasurementSynced(id, serverId) {
                                              await db.measurements.update(id, {
                                                  synced: 1,
                                                      serverId: serverId
                                                        });
                                                        }

                                                        export async function getAllOfflineMeasurements() {
                                                          return db.measurements
                                                              .orderBy("createdAt")
                                                                  .reverse()
                                                                      .toArray();
                                                                      }
                                                                      