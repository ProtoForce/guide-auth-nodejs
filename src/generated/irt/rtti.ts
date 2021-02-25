
/**
 * Runtime type identification interface
 */
export interface WithRTTI {
    /**
     * Class of an object
     * E.g. User
     */
    RTTI_CLASS: string;
    /**
     * Fully qualified name of an object
     * E.g. com.example.User
     */
    RTTI_FQN: string;
}