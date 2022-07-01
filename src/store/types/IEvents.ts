export interface IEvents {
  id: string;
  action: IAction[];
}

export interface IAction {
  time: string;
  event: IEvent;
  note: string;
}

interface IEvent {
  id: string;
  name: string;
}
