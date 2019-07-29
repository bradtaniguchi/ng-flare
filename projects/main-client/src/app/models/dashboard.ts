/**
 * The dashboard is a user's dashboard which is shown on the main dashboard page.
 */
export interface Dashboard {
  widgets: DashboardWidget[];
  /**
   * Date anything in the dashboard was updated
   */
  updatedOn?: Date;
}

export enum DashboardWidgetTypes {
  DECK_ACTIONS = 'DECK_ACTIONS',
  GROUP_SELECT = 'GROUP_SELECT',
  CREATE_ACTIONS = 'CREATE_ACTIONS',
  STUDY_ACTIONS = 'STUDY_ACTIONS'
}

export interface DashboardWidgetLayoutSettings {
  /**
   * Flex size to apply, currently hard-coded
   */
  flex: string;
}

export interface DashboardWidget {
  type: DashboardWidgetTypes;

  /**
   * Layout settings
   */
  layout?: DashboardWidgetLayoutSettings;
  /**
   * When this widget was created.
   */
  createdOn: Date;
  /**
   * When this widget was updated
   */
  updatedOn?: Date;
}

export interface DeckActionsDashboardWidget extends DashboardWidget {
  type: DashboardWidgetTypes.DECK_ACTIONS;
  /**
   * Id of the deck
   */
  uid: string;
}

export interface GroupSelectDashboardWidget extends DashboardWidget {
  type: DashboardWidgetTypes.GROUP_SELECT;
  /**
   * Id of the group
   */
  uid: string;
}

export interface CreateActionsDashboardWidget extends DashboardWidget {
  type: DashboardWidgetTypes.CREATE_ACTIONS;
}

export interface StudyActionsDashboardWidget extends DashboardWidget {
  type: DashboardWidgetTypes.STUDY_ACTIONS;
}
