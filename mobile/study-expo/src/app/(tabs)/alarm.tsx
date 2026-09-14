import AlarmKit from "@/modules/alarm-kit";
const status =
  await AlarmKit.requestAuthorization();

console.log(status);

function getNextAlarmDate(
  hour: number,
  minute: number,
) {
  const now = new Date();

  const alarmDate = new Date();

  alarmDate.setHours(
    hour,
    minute,
    0,
    0,
  );

  if (alarmDate <= now) {
    alarmDate.setDate(
      alarmDate.getDate() + 1,
    );
  }

  return alarmDate;
}

const alarmDate =
  getNextAlarmDate(7, 30);

const id = crypto.randomUUID();

await AlarmKit.scheduleAlarm(
  id,
  alarmDate.getTime(),
  "기상",
);