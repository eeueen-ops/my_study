import ExpoModulesCore
import AlarmKit
import SwiftUI

struct EmptyAlarmMetadata: AlarmMetadata {}

public class AlarmKitModule: Module {
  public func definition() -> ModuleDefinition {

    Name("AlarmKitModule")

    AsyncFunction("requestAuthorization") {
      let state = try await AlarmManager.shared.requestAuthorization()

      switch state {
      case .authorized:
        return "authorized"

      case .denied:
        return "denied"

      case .notDetermined:
        return "notDetermined"

      @unknown default:
        return "unknown"
      }
    }

    AsyncFunction("scheduleAlarm") {
      (
        id: String,
        timestamp: Double,
        title: String
      ) in

      guard let alarmID = UUID(uuidString: id) else {
        throw InvalidAlarmIdException()
      }

      let date = Date(
        timeIntervalSince1970: timestamp / 1000
      )

      let schedule = Alarm.Schedule.fixed(date)

      let alert = AlarmPresentation.Alert(
        title: title
      )

      let presentation = AlarmPresentation(
        alert: alert
      )

      let attributes = AlarmAttributes<EmptyAlarmMetadata>(
        presentation: presentation,
        metadata: EmptyAlarmMetadata(),
        tintColor: .blue
      )

      let configuration =
        AlarmManager.AlarmConfiguration<EmptyAlarmMetadata>.alarm(
          schedule: schedule,
          attributes: attributes
        )

      try await AlarmManager.shared.schedule(
        id: alarmID,
        configuration: configuration
      )

      return alarmID.uuidString
    }

    AsyncFunction("cancelAlarm") {
      (id: String) in

      guard let alarmID = UUID(uuidString: id) else {
        throw InvalidAlarmIdException()
      }

      try await AlarmManager.shared.cancel(
        id: alarmID
      )
    }
  }
}

class InvalidAlarmIdException: Exception {
  override var reason: String {
    "Invalid alarm UUID"
  }
}