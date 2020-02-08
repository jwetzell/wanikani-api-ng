import { SubjectType } from '../../enums/subject-type.enum';
import { SrsStage } from '../../enums/srs-stage.enum';
import { SrsStageName } from '../../enums/srs-stage-name.enum';

export interface Assignment {
  id:               number;
  object:           'assignment';
  url:              string;
  data_updated_at:  Date;
  data: {
    created_at:     Date;
    subject_id:     number;
    subject_type:   SubjectType;
    level?:         number;
    srs_stage:      SrsStage;
    srs_stage_name: SrsStageName;
    unlocked_at:    Date;
    started_at:     Date;
    passed_at:      Date;
    burned_at:      Date;
    available_at:   Date;
    passed:         boolean;
    resurrected_at: Date;
  }
}