import { useAppSelector } from '@slice';
import { useGetTeamsQuery } from '@slice/services';

export const useSelectTeams = () => {
    const userDetails = useAppSelector(state => state.user);
    const { data, isSuccess } = useGetTeamsQuery({ path: '', params: [{ name: 'organisationId', value: userDetails.organisationId }] });

    const teamsList = isSuccess
        ? data?.teams
              .filter((team: any) => team.teamStatus === true)
              .map((team: any) => {
                  return { value: team.id, label: team.teamName };
              })
              .sort((a: any, b: any) => a.label.localeCompare(b.label))
        : [];

    return {
        teamsList
    };
};
