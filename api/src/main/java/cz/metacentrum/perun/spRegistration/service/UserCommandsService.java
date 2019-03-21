package cz.metacentrum.perun.spRegistration.service;

import cz.metacentrum.perun.spRegistration.persistence.exceptions.CreateRequestException;
import cz.metacentrum.perun.spRegistration.persistence.exceptions.RPCException;
import cz.metacentrum.perun.spRegistration.persistence.models.Facility;
import cz.metacentrum.perun.spRegistration.persistence.models.PerunAttribute;
import cz.metacentrum.perun.spRegistration.persistence.models.Request;
import cz.metacentrum.perun.spRegistration.persistence.models.User;
import cz.metacentrum.perun.spRegistration.service.exceptions.CannotChangeStatusException;
import cz.metacentrum.perun.spRegistration.service.exceptions.InternalErrorException;
import cz.metacentrum.perun.spRegistration.service.exceptions.UnauthorizedActionException;

import java.util.List;

/**
 * Service layer with methods specific for Users.
 *
 * @author Dominik Frantisek Bucik <bucik@ics.muni.cz>
 */
public interface UserCommandsService {

	/**
	 * Create request for Registration of SP (initial version of facility, not stored in Perun yet).
	 * @param userId ID of requesting user.
	 * @param attributes Attributes set for SP (key = attribute name, value = attribute).
	 * @return Generated request ID after storing to the DB.
	 */
	Long createRegistrationRequest(Long userId, List<PerunAttribute> attributes) throws InternalErrorException, CreateRequestException;

	/**
	 * Create request for changes of SP (which already exists as facility in Perun).
	 * @param facilityId ID of facility in Perun.
	 * @param userId ID of requesting user.
	 * @param attributes Attributes set for SP (key = attribute name, value = attribute).
	 * @return Generated request ID after storing to the DB.
	 * @throws UnauthorizedActionException when user is not authorized to perform this action.
	 */
	Long createFacilityChangesRequest(Long facilityId, Long userId, List<PerunAttribute> attributes)
			throws UnauthorizedActionException, RPCException, InternalErrorException, CreateRequestException;

	/**
	 * Create request for removal of SP (which already exists as facility in Perun).
	 * @param userId ID of requesting user.
	 * @param facilityId ID of facility in Perun.
	 * @return Generated request ID after storing to the DB.
	 * @throws UnauthorizedActionException when user is not authorized to perform this action.
	 */
	Long createRemovalRequest(Long userId, Long facilityId)
			throws UnauthorizedActionException, RPCException, InternalErrorException, CreateRequestException;

	/**
	 * Update existing request in DB with new data.
	 * @param requestId ID of request in DB.
	 * @param userId ID of requesting user.
	 * @param attributes Attributes set for SP (key = attribute name, value = attribute).
	 * @return True if everything went OK.
	 * @throws UnauthorizedActionException when user is not authorized to perform this action.
	 */
	boolean updateRequest(Long requestId, Long userId, List<PerunAttribute> attributes)
			throws UnauthorizedActionException, InternalErrorException;

	/**
	 * Ask for moving the service to the production environment.
	 * @param facilityId ID of facility in Perun.
	 * @param userId ID of requesting user.
	 * @param authorities List to whom the emails should be sent
	 * @return Id of created request
	 * @throws UnauthorizedActionException when user is not authorized to perform this action.
	 */
	Long requestMoveToProduction(Long facilityId, Long userId, List<String> authorities) throws UnauthorizedActionException, InternalErrorException, RPCException, CreateRequestException;

	/**
	 * Get details of facility for the signatures interface
	 * @param facilityId id of facility
	 * @return Fetched facility object
	 * @throws RPCException when some problem with Perun RPC has occurred.
	 */
	Facility getFacilityDetailsForSignature(Long facilityId) throws RPCException;

	/**
	 * Add signature for transfer to production
	 * @param facilityId id of facility to be moved
	 * @param hash hash of request
	 * @param user user giving the signature
	 * @return True if everything went OK
	 */
	boolean signTransferToProduction(Long facilityId, String hash, User user);

	/**
	 * Get all facilities from Perun where user is admin (manager).
	 * @param userId ID of user.
	 * @return List of facilities.
	 */
	List<Facility> getAllFacilitiesWhereUserIsAdmin(Long userId) throws RPCException;

	/**
	 * Get all requests user can access (is requester or admin(manager) of facility)
	 * @param userId ID of user.
	 * @return List of requests.
	 */
	List<Request> getAllRequestsUserCanAccess(Long userId) throws RPCException;

	/**
	 * Get detailed request.
	 * @param requestId ID of request.
	 * @param userId ID of user.
	 * @return Found request.
	 * @throws UnauthorizedActionException when user is not authorized to perform this action.
	 */
	Request getDetailedRequest(Long requestId, Long userId) throws UnauthorizedActionException, InternalErrorException;

	/**
	 * Get detailed facility.
	 * @param facilityId ID of facility.
	 * @param userId ID of user.
	 * @return Found facility.
	 * @throws UnauthorizedActionException when user is not authorized to perform this action.
	 */
	Facility getDetailedFacility(Long facilityId, Long userId) throws UnauthorizedActionException, RPCException, InternalErrorException;
}
